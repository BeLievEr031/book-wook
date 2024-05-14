import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { bookArr } from "@/constant/book";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Divide, Eye, Pencil, Trash } from "lucide-react";

function DisplayBook() {
    const navigate = useNavigate();
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center border-b-2">
                <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            </div>
            {bookArr.length === 0 ? <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col items-center gap-1 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no products
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start selling as soon as you add a product.
                    </p>
                    <Button className="mt-4" onClick={() => { navigate("/dashboard/add-book") }}>
                        Add Book
                    </Button>
                </div>
            </div> : <div>

                <div className="flex justify-end">
                    <Button variant="bookshelfEntry" onClick={() => { navigate("/dashboard/add-book") }}>Add Book</Button>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">title</TableHead>
                            <TableHead className="text-center">author</TableHead>
                            <TableHead className="text-center">Genre</TableHead>
                            <TableHead className="text-center">isForSale</TableHead>
                            <TableHead className="text-center">isForRent</TableHead>
                            <TableHead className="text-center">rating</TableHead>
                            <TableHead className="text-center">quantity</TableHead>
                            <TableHead className="text-right">price</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookArr.map((book) => {
                            console.log(book);
                            return <TableRow key={book._id}>
                                <TableCell className="font-medium">{book.title}</TableCell>
                                <TableCell className="text-center">{book.author}</TableCell>
                                <TableCell className="text-center">{book.genreid}</TableCell>
                                <TableCell className="text-center">{book.isForSale + ""}</TableCell>
                                <TableCell className="text-center">{book.isForRent + ""}</TableCell>
                                <TableCell className="text-center">{book.rating}</TableCell>
                                <TableCell className="text-center">{book.quantity}</TableCell>
                                <TableCell className="text-right">{book.price}</TableCell>
                                <TableCell className="flex justify-center gap-2">
                                    <Trash className="cursor-pointer" />
                                    <Pencil className="cursor-pointer" />
                                    <Eye className="cursor-pointer" />
                                </TableCell>
                            </TableRow>
                        }
                        )}
                    </TableBody>
                    <TableFooter className="ml-auto">
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            }
        </main>
    )
}

export default DisplayBook