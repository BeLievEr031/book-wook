import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StepBack, StepForward } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const invoices = [
  {
    invoice: "66371d60cf2832403ec8d45a",
    paymentStatus: "Sandeep Rajak",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "66371d60cf2832403ec8d45ab",
    paymentStatus: "Yashvardhan pulakala",
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
function Order() {
  return (
    <main className="flex flex-1 flex-col gap-2 p-4 lg:gap-2 lg:p-6">
      <div className="flex items-center border-b-2">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <div className='flex justify-end mt-0'>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
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
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow className="capitalize font-bold">
              <TableHead className="">Order Id</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>amount</TableHead>
              <TableHead className='text-center w-[100px]'>cart item</TableHead>
              <TableHead className='text-center'>status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="p-0">
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className="p-0">
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-center">5</TableCell>
                <TableCell className="flex justify-center">
                  <Select defaultValue={"Pending"}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Change Order Status." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          ['Pending', 'Processing', 'Shipped', 'Delivered', "Cancle"].map((status) => {
                            return <SelectItem value={status} key={status}>{status}</SelectItem>
                          })
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

export default Order