import { api } from "~/trpc/react";
import { RentalStatus } from "../types";
import { useModal } from "../_hooks/use-modal";

export default function RentalInfo(props: { onCancel: () => void, rentalId: number, startDate: Date, endDate: Date, pickupDate?: Date | null, returnDate?: Date | null, cancelDate?: Date | null, items: string[] }) {
    let status;
    let caption;
    let color;

    const { setOpen, addInfo } = useModal()

    const deleteReservationMutation = api.rental.cancelReservation.useMutation()

    const handleCancelReservation = () => {
        deleteReservationMutation.mutateAsync({ rentalId: props.rentalId })
            .then(value => {
                console.log(value)
                addInfo(
                    <div className="pt-10 p-4 rounded-lg flex flex-col gap-4">
                        <h4 className="text-primary">Rental Succesfully Canceled</h4>
                        <p>Items have been released to others</p>
                    </div>);
                setOpen(true)
            })
            .catch(reason => {
                console.error(reason)
                addInfo(
                    <div className="pt-10 p-4 rounded-lg flex flex-col gap-4">
                        <h4 className="text-secondary">Error canceling reservation</h4>
                        <p>{`${reason}`}</p>
                    </div>);
                setOpen(true)
            })
            .finally(props.onCancel)
    }

    if (props.returnDate) {
        status = RentalStatus.RETURNED
        caption = `Thank you! Returned on ${props.returnDate.toDateString()}`
        color = "bg-gray-400"
    } else if (props.pickupDate) {
        status = RentalStatus.PICKED_UP
        caption = `Picked-up on ${props.pickupDate.toDateString()}`
        color = "bg-primary"
    } else if (!props.pickupDate && props.endDate.getTime() < Date.now()) {
        status = RentalStatus.EXPIRED
        caption = "You did not pick up your items in time"
        color = "bg-gray-400"
    } else if (!props.returnDate && props.endDate.getTime() < Date.now()) {
        status = RentalStatus.OVERDUE
        caption = "Please return items as soon as possible"
        color = "bg-secondary"
    } else {
        status = RentalStatus.RESERVED
        caption = "Pickup as soon as reservation starts"
        color = "bg-primary"
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
            <button disabled={status !== RentalStatus.RESERVED} onClick={handleCancelReservation} className=" disabled:bg-gray-400 grow w-56 h-10 bg-primary text-white rounded-lg flex justify-center items-center">
                <p className=" text-lg text-wrap">Cancel Reservation</p>
            </button>
            <button disabled={status !== RentalStatus.EXPIRED && status !== RentalStatus.RETURNED} className=" disabled:bg-gray-400 grow w-56 h-10 bg-primary text-white rounded-lg flex justify-center items-center">
                <p className=" text-lg">Quick Reserve</p>
            </button>
        </div>
    </div>
}