import gitLogo from '../assets/github.png'
import reactLogo from '../assets/react.svg'
import '../App.css'

function Footer(){


    return(
        <div className='footer dropshadow'>
            <p>Made with <img className='logo react logo-spin' src={reactLogo}/></p>
            <p>© El-Amine Bendaas</p>
            <a href='https://github.com/Elaminebendaas' target='_blank'><img width={55} className="gitlogo" src={gitLogo}></img></a>
        </div>
    )
}
export default Footer