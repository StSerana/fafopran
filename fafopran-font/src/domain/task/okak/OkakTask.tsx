import okak from '../../../assets/okak.png'
import './okak.css'

export default function OkakTask() {
    return (<div className="is-frame">
        <div className="in-frame">
            <img src={okak} alt="Man" className="is-image"/>
        </div>
    </div>)
}