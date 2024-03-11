

export function Review({ review }) {
    return <React.Fragment>
        <h5>{review.fullName}</h5>
        <h5>Rating: {review.rating}</h5>
        <h5>reding at: {review.readAt}</h5>
    </React.Fragment>
}