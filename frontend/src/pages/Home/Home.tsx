import Header from '@/components/ui/Header'
import AuthorRow from './_components/AuthorRow'
import GenreRow from './_components/GenreRow'
import TrendingRow from './_components/TrendingRow'
import TopDealsRow from './_components/TopDealsRow'

function Home() {
    return (
        <main className='bg-slate-800/50'>
            <Header />
            <GenreRow />
            <AuthorRow />
            <TrendingRow />
            <TopDealsRow/>
        </main>
    )
}

export default Home