import '@/app/profile/profileStyles.css'
import {Metadata} from "next";
import pageLoading from '@/img/loading/dae51770-1bf2-469c-82a9-77a67a17b8ff.gif'
import Image from "next/image";
// export const metadata: Metadata = {
//     title: 'Store | MariDenizDesign',
// }
export default function LoadingProducts(){
    return (
            <div className='loading-container'>
                <Image className='loading-animation' src={pageLoading} alt='Loading...'/>
            </div>
    )
}
