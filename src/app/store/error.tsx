'use client';
import '../profile/profileStyles.css'
export default function ErrorProducts({error}: {error: Error}){
    return (
        <div className='loading-container'>
            <h4>Oops! {error.message}</h4>
        </div>
    )
}
