import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property have ocean view!'
    },
    {
        label: 'Windmill',
        icon: GiWindmill,
        description: 'This property have windmills!'
    },
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property have ocean view!'
    },
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property have ocean view!'
    },
]

const Categories = () => {
    return (
        <Container>
            <div className=" pt-4 flex flex-row items-center justify-between overflow-x-auto">

            </div>
        </Container>
    )
}

export default Categories;