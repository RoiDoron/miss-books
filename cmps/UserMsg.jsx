

export function UserMsg({ msg }) {
    if (!msg) return <React.Fragment></React.Fragment>
    return <div className="user-msg success">
        {msg}
    </div>

}