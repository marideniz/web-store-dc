'use client'
import '../AboutStyles.css'
import React, {useState} from "react";
import FooterErrorBlock from "@/components/modals/footerErrorBlock";
import FooterCooperationBlock from "@/components/modals/footerCooperationBlock";
import aboutBg from "@/img/aboutBg.png";
import Image from "next/image";
import instLogo from "@/img/shearIcons/instlogo.png";
import tglogo from "@/img/shearIcons/tglogo.png";
import vklogo from "@/img/shearIcons/vklogo.png";
import fblogo from "@/img/shearIcons/fblogo.png";

export default function Contacts() {
    const [isFooterErrorBlockOpen, setIsFooterErrorBlockOpen] = useState(false);
    const [isFooterCooperationBlockOpen, setIsFooterCooperationBlockOpen] = useState(false);
    const toggleFooterErrorBlock = () => {
        setIsFooterErrorBlockOpen(!isFooterErrorBlockOpen);
        setIsFooterCooperationBlockOpen(false);
    };

    const toggleFooterCooperationBlock = () => {
        setIsFooterCooperationBlockOpen(!isFooterCooperationBlockOpen);
        setIsFooterErrorBlockOpen(false);
    };
    return (
        <div className={'contacts'}>
            {isFooterErrorBlockOpen && (
                <FooterErrorBlock onClose={toggleFooterErrorBlock}/>
            )}
            {isFooterCooperationBlockOpen && (
                <FooterCooperationBlock onClose={toggleFooterCooperationBlock}/>
            )}
            <Image className={'contacts-bg-img'} src={aboutBg} alt={''}/>
            <h2 className={'title'}>Контакты</h2>
            <div className={'contact-data-block'}>
                {/*<p className={'contact-data'}><b>Наш адрес:</b> ул. Название, город, Почтовый индекс</p>*/}
                {/*<div style={{display:"flex", flexDirection:"row"}}>*/}
                {/*<p className={'contact-data'}><b>Телефоны:</b></p>*/}
                {/*    <div style={{display:"flex", flexDirection:"column", marginLeft:"6px"}}>*/}
                {/*<p className={'contact-data'}> +8 (962) 936-11-40</p>*/}
                {/*<p className={'contact-data'}> +8 (929) 524-47-28</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <p className={'contact-data'}><b>Email:</b> mari28deniz@gmail.com</p>
                <p className={'contact-data'}><b>Адрес:</b> Москва</p>
                {/*<p className={'contact-data'}><b>График работы:</b> Пн-Пт, 9:00-18:00</p>*/}
            </div>
            <div className='contacts-social-links'>
                <div className='footer-social-links-block'>
                    <a href="https://t.me/marideniz_brand" target="_blank" rel="noopener noreferrer">
                        <Image src={tglogo} alt="Telegram"/>
                    </a>
                </div>
                <div className='footer-social-links-block'>
                    <a href="https://vk.com/marideniz_brand" target="_blank" rel="noopener noreferrer">
                        <Image src={vklogo} alt="VKontakte"/>
                    </a>
                </div>
                <div className='footer-social-links-block'>
                    <a href="https://www.instagram.com/marideniz.ru?igsh=aDV0eDJpOW1ndW5t"
                       target="_blank" rel="noopener noreferrer">
                        <Image src={instLogo} alt="Instagram"/>
                    </a>
                </div>
            </div>

            <div className='footer-error-block'>
                <p>Свяжитесь с нами</p>
                <div className='footer-btns-block'>
                    <button className='footer-error-btn' onClick={toggleFooterErrorBlock}>
                        <p>Сообщить об ошибке</p>
                    </button>
                    <button className='footer-cooperation-btn' onClick={toggleFooterCooperationBlock}>
                        <p>Предложение о сотрудничестве</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
