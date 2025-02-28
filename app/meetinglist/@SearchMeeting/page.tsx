"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function SearchMeetings() {
    const searchParams = useSearchParams();

    const {replace} = useRouter();
    const pathname = usePathname();
    
    function handleOnChange(input:string){
        const params = new URLSearchParams(searchParams)
    
        if(input){
            params.set("query",input)
        }else{
            params.delete("query")
        }
    
        replace(`${pathname}?${params.toString()}`)
    }
    
    
    return (
    <div className=" w-full">
        <input onChange={(e)=>handleOnChange(e.target.value)} placeholder="Search" defaultValue={searchParams.get("query")?.toString()} className=" p-3 border border-grey-400 rounded-md"/>
    </div>
  )
}



