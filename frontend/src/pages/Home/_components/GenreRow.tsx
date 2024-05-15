import { Button } from "@/components/ui/button";

const genres = [
    { name: "Action" },
    { name: "Adventure" },
    { name: "Comedy" },
    { name: "Drama" },
    { name: "Fantasy" },
    { name: "Horror" },
    { name: "Mystery" },
    { name: "Romance" },
    { name: "Science Fiction" },
    { name: "Thriller" },
    { name: "Drama" },
];


export default function GenreRow() {
    return (
        <div className="mt-2 w-[95%] bg-white md:h-[80px] py-4 px-2 md:p-0 mx-auto rounded-lg flex justify-center items-center gap-5 flex-wrap">
            {
                genres.map((genre, idx) => {
                    return <Button variant={"genre"} key={idx} className="">{genre.name}</Button>
                })
            }
        </div>
    )
}
