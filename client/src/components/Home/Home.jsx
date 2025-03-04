import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import AboutSection from './AboutSection'
import HeroSection from './HeroSection'
import StoriesSection from './StoriesSection'

export default function Home() {
    return (
        <div>
            <HeroSection/>
            <AboutSection/>
            <StoriesSection/>
            <Footer/>
        </div>
    )
}
