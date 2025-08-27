
export function Loading(){ return <div className="alert">Loading…</div> }
export function ErrorMsg({ message }: { message: string }){ return <div className="alert error">Error: {message}</div> }
