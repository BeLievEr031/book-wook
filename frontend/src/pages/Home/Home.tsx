import Header from '@/components/ui/Header'
import AuthorRow from './_components/AuthorRow'
import GenreRow from './_components/GenreRow'
import TrendingRow from './_components/TrendingRow'
import TopDealsRow from './_components/TopDealsRow'
import Footer from './_components/Footer'

function Home() {
    return (
        <main className='bg-slate-800/50'>
            <Header />
            <GenreRow />
            <AuthorRow />
            <TrendingRow />
            <TopDealsRow/>
            <Footer/>
        </main>
    )
}

export default Home