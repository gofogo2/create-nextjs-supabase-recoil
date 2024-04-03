"use client";
import { NotesState } from "@/atom";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";

export default function Page() {
  const [notes, setNotes] = useRecoilState(NotesState);
  const supabase = createClient();

  useEffect(() => {
    const userListener = supabase
      .channel("public:notes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notes" },
        (payload) => handleAllEventsPayload(payload)
      )
      .subscribe((error) => {
        if (error) console.error("Subscription error:", error);
        else console.log("Successfully subscribed to changes");
      });
    const getData = async () => {
      const { data } = await supabase.from("notes").select();
      setNotes(data);
    };
    getData();
    return () => {
      userListener.unsubscribe();
    };
  }, []);
  function handleAllEventsPayload(payload: any): void {
    console.log(payload);
    // INSERT 이벤트 처리
    if (payload.eventType === "INSERT") {
      setNotes((currentNotes) => {
        const isExisting = currentNotes?.some(
          (note) => note.id === payload.new.id
        );
        if (!isExisting && currentNotes != null) {
          return [...currentNotes, payload.new];
        }
        return currentNotes;
      });
    }
    // UPDATE 이벤트 처리
    else if (payload.eventType === "UPDATE") {
      console.log("UPDATE");
    }
    // DELETE 이벤트 처리
    else if (payload.eventType === "DELETE") {
      console.log("DELETE");
    }
  }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}

function handleAllEventsPayload(payload: any): void {
  console.log(payload);
}
