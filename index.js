#!/usr/bin/env node
import path from "node:path";
import * as fs from "node:fs";
const p=path.join(import.meta.dirname,"./activity.json");
const a=process.argv.slice(2);
const username=a[0]||"";
try {
    var d=fs.readFileSync(p,"utf8");
} catch (error) {
    fs.writeFileSync(p,JSON.stringify([]),"utf8");
    var d=fs.readFileSync(p,"utf8");
    console.log("nofile exist");
}
const data=d?JSON.parse(d):[];
if(username==="")
{
    console.log("invalid username");
}
else 
{
   const t=await fetchdata({username:username});
   readuseractivity({data:t});
}
function readuseractivity({data})
{  console.log("Recent activity-")
    for(const i of data)
    {
        console.log(i.type,"->",i.repo.name);
    }
}
async function fetchdata({username})
{
    const uac=data.filter((d)=>{return d.actor.login===username})
    if(uac.length===0)
    {
     try {
         const n=await fetch(`https://api.github.com/users/${username}/events`,{method:"GET"});
        var c=await n.json();
     } catch (error) {
        console.log("github api is down");
        var c=[];
     }
      data.push(...c);
      fs.writeFileSync(p,JSON.stringify(data),"utf8");
      return c;
    }
    else 
    {   
        return uac;
    }
}

