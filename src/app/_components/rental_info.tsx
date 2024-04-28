
enum RentalStatus {
    RETURNED = "Returned",
    CANCELED = "Canceled",
    PICKED_UP = "Picked-up",
    OVERDUE = "Overdue",
    RESERVED = "Reserved",
}

export default function RentalInfo(props: { startDate: Date, endDate: Date, pickupDate?: Date | null, returnDate?: Date | null, cancelDate?: Date | null, items: string[] }) {
    let status;
    let caption;
    let color;

    switch (true) {
        case (props.returnDate !== undefined && props.returnDate !== null):
            status = RentalStatus.RETURNED
            caption = `Returned on ${props.returnDate.toDateString()}`
            color = "bg-gray-400"
            break
        case (props.cancelDate !== undefined && props.cancelDate !== null):
            status = RentalStatus.CANCELED
            caption = `Canceled on ${props.cancelDate.toDateString()}`
            color = "bg-gray-400"
            break
        case (props.pickupDate !== undefined && props.pickupDate !== null):
            status = RentalStatus.PICKED_UP
            caption = `Picked-up on ${props.pickupDate.toDateString()}`
            color = "bg-primary"
            break
        // Assumes the other dates are undefined
        case (props.endDate.getTime() < Date.now()):
            status = RentalStatus.OVERDUE
            caption = "Please return items as soon as possible"
            color = "bg-secondary"
            break;
        default:
            status = RentalStatus.RESERVED
            caption = "Pickup as soon as reservation starts"
            color = "bg-primary"
            break;
    }

    return <div className=" p-8 w-full bg-white rounded-lg outline outline-1 outline-gray-400 flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-16 justify-between">
        <div className=" flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-16 justify-between">
            <div className=" grow flex flex-col flex-wrap gap-4">
                <div className=" text-pretty">{props.startDate.toDateString()} - {props.endDate.toDateString()}</div>
                <div className={` w-full h-10 ${color} text-white rounded-lg flex justify-center items-center`}>
                    <p className=" text-lg">{status}</p>
                </div>
                <p className="">
                    {caption}
                </p>
            </div>
            <ul className=" list-disc list-inside grow">
                {props.items.slice(0, 3).map((item) => {
                    return <li key={item}>{item}</li>
                })}
                {props.items.length > 3 && <li>and {props.items.length - 3} more item(s)...</li>}
            </ul>
        </div>
        <div className=" flex flex-row flex-wrap lg:flex-col justify-between gap-4">
            <button disabled={status !== RentalStatus.RESERVED} className=" disabled:bg-gray-400 grow w-56 h-10 bg-primary text-white rounded-lg flex justify-center items-center">
                <p className=" text-lg text-wrap">Cancel Reservation</p>
            </button>
            <button disabled={status !== RentalStatus.CANCELED && status !== RentalStatus.RETURNED} className=" disabled:bg-gray-400 grow w-56 h-10 bg-primary text-white rounded-lg flex justify-center items-center">
                <p className=" text-lg">Quick Reserve</p>
            </button>
        </div>
    </div>
}