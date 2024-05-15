import BookSrc from "../../../assets/test_book.jpg"
const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby xv gfg ryb y ruthesrwe segfds", author: "F. Scott Fitzgerald" },
    { title: "Pride and Prejudice", author: "Jane Austen" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby xv gfg ryb y ruthesrwe segfds", author: "F. Scott Fitzgerald" },
    { title: "Pride and Prejudice", author: "Jane Austen" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger" },
];


function TopDealsRow() {

    const resolveTitle = (title: string) => {
        return title.length > 20 ? title.substring(0, 20) + "..." : title;
    }
    return (
        <div className="mt-4 w-[95%] bg-white mx-auto py-4 md:px-6 rounded-lg ">
            <h1 className="text-2xl font-bold">Top Deals</h1>
            <div className="flex justify-center gap-4 md:gap-10 mt-6 flex-wrap">
                {
                    books.map((book, idx) => {
                        return <div className="p-4 border rounded-lg shadow-lg w-[170px] md:w-[220px] h-full cursor-pointer transition-transform duration-300 hover:-translate-y-4" key={idx}>
                        <div className="w-full h-[150px] md:h-[220px] bg-red-500">
                            <img className="w-full h-full bg-cover" src={BookSrc} alt="" />
                        </div>
                        <p className="font-bold mt-2 text-sm">{resolveTitle(book.title)}</p>
                        <p className="mt-2">{resolveTitle(book.author)}</p>
                        <p className="mt-1">250 Rs</p>
                    </div>
                    })
                }
            </div>
        </div>
    )
}

export default TopDealsRow