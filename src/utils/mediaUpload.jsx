import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const url="https://psqoxjtxcvzbvdhorcqb.supabase.co"
const key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzcW94anR4Y3Z6YnZkaG9yY3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MjY1NzksImV4cCI6MjA3MTAwMjU3OX0.0PzF0Gj8yCl3_xX03mCF03GNE9zWkkqJbvGgLZpNP-Q"

const supabase = createClient(url,key)

  
  
  
  export default function uploadfile(file){

    const promise = new Promise(

        (reslove, reject)=>{

            if(file==null){
                reject("Please select a file to upload");
            }

             const timeStamp = new Date().getTime();
             const fileName = timeStamp+"-"+file.name;

             supabase.storage.from("media").upload(fileName,file,{
                cacheControl: "3600",
                upsert: false
             }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("media").getPublicUrl(fileName).data.publicUrl;
                    
                    reslove(publicUrl)
                }
             ).catch(
                ()=>{
                    
                    reject("Faild to upload file");
                }

             )

              

        }
    )

    return promise;

  }

 

