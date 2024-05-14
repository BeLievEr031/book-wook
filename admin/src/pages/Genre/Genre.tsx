import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye, Pencil, StepBack, StepForward, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,

} from "@/components/ui/pagination"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]
function Genre() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center border-b-2">
                <h1 className="text-lg font-semibold md:text-2xl">Genre</h1>
            </div>
            <div className='flex justify-between'>
                <div>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                {/* <PaginationPrevious href="#" /> */}
                                <Button variant={"ghost"} className="flex gap-1 items-center">

                                    <StepBack />
                                    Prev
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink isActive>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem >
                                <Button variant={"ghost"} className="flex gap-1 items-center">Next
                                    <StepForward />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"save"}>Add Genre</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add Genre</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="name" className="sr-only">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter genre name."
                                    type="text"
                                />
                            </div>
                        </div>
                        <DialogFooter className="p-4 sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="destructive" className="mt-4 md:mt-0">
                                    Close
                                </Button>

                            </DialogClose>
                            <Button type="button" variant="save">
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Sr No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className='text-center'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="flex justify-center gap-2">
                                    <Trash className="cursor-pointer w-8 h-8 hover:bg-slate-300/50 p-1 rounded-full" />
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Pencil className="cursor-pointer w-8 h-8 hover:bg-slate-300/50 p-1 rounded-full" />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Update Genre</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex items-center space-x-2">
                                                <div className="grid flex-1 gap-2">
                                                    <Label htmlFor="name" className="sr-only">
                                                        Name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        placeholder="Enter genre name."
                                                        type="text"
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter className="p-4 sm:justify-start">
                                                <DialogClose asChild>
                                                    <Button type="button" variant="destructive" className="mt-2 md:mt-0">
                                                        Close
                                                    </Button>

                                                </DialogClose>
                                                <Button type="button" variant="save" >
                                                    Update
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Eye className="cursor-pointer w-8 h-8 hover:bg-slate-300/50 p-1 rounded-full" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}

export default Genre