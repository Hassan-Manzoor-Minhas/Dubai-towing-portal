export default function PageTitle({title,description,action}:{title:string;description?:string;action?:React.ReactNode}) {
  return <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
    <div><h1 className="text-[26px] sm:text-[30px] font-extrabold tracking-tight text-slate-900">{title}</h1>{description&&<p className="text-sm text-slate-500 mt-1">{description}</p>}</div>
    {action}
  </div>
}