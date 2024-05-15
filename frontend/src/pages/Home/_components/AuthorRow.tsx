import AuthorSrc from "../../../assets/test_author.jpg"
const authors = [
    {
        name: "John Doe",
        profileImg: "https://example.com/profiles/john.jpg"
    },
    {
        name: "Alice Smith",
        profileImg: "https://example.com/profiles/alice.jpg"
    },
    {
        name: "Michael",
        profileImg: "https://example.com/profiles/michael.jpg"
    },
    {
        name: "Emily Brown",
        profileImg: "https://example.com/profiles/emily.jpg"
    },
    {
        name: "Daniel",
        profileImg: "https://example.com/profiles/daniel.jpg"
    },
    {
        name: "Sophia Lee",
        profileImg: "https://example.com/profiles/sophia.jpg"
    },
    {
        name: "Matthew",
        profileImg: "https://example.com/profiles/matthew.jpg"
    },
    {
        name: "Olivia ",
        profileImg: "https://example.com/profiles/olivia.jpg"
    },
    
];

function AuthorRow() {
    return (
        <div className="pb-10 md:h-[180px] bg-white w-[95%] mx-auto mt-8 flex justify-center gap-4 md:gap-10 rounded-lg flex-wrap">
            {
                authors.map((authors,idx) => {
                    return <div className="cursor-pointer transition-scale duration-300 hover:scale-110 w-[100px] h-[100px] text-center mt-8 md:mt-5" key={idx}>
                        <img src={AuthorSrc} alt="" className="w-full h-full bg-cover rounded-sm md:rounded-full" />
                        <p className="font-bold mt-1 text-sm">
                            {authors.name}
                        </p>
                    </div>
                })
            }
        </div>
    )
}

export default AuthorRow