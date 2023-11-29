import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AboutCanvas } from '../../components/aboutCanvas';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { useAppStore } from '../../stores';
import { MoveLeft } from 'lucide-react';
function About() {
    const { checkMode } = useAppStore();
    useEffect(() => {
        checkMode();
        console.log('asdasd');
    }, []);
    return (
        <>
            {' '}
            <Link
                to="/"
                className="text-light-700_dark200 fixed left-6 top-6 z-50 animate-pulse cursor-pointer text-lg"
            >
                <MoveLeft />
            </Link>
            <div className="fixed right-6 top-6">
                <ThemeSwitcher />
            </div>
            <section className="text-light-700_dark200 flex h-screen w-full flex-col justify-center pl-10 lg:pl-80  ">
                <div className="sm:w-1/2">
                    <h1 className="mb-4 text-5xl sm:mb-8">Smartwach Widget</h1>
                    <p className="s:p-4 text-base">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, soluta! Explicabo, placeat
                        sed. Labore perspiciatis nobis eveniet accusamus itaque repudiandae in distinctio voluptatibus,
                        similique officiis? Facilis accusantium culpa suscipit modi. Odit autem eum tenetur ducimus
                        odio. Tempore obcaecati dicta exercitationem, animi doloribus aperiam nulla quidem, recusandae
                        tempora sit rem ullam at. Quos sequi cupiditate nam eius culpa quibusdam, cum dolorum. Veritatis
                        illum omnis odio, quod voluptatum enim quia amet doloremque aliquid velit architecto modi dolore
                    </p>
                </div>
            </section>
            <section className="text-light-700_dark200 flex  h-[100vh] w-full   flex-col items-end justify-center  pl-10 text-white   lg:pr-80">
                <div className="sm:w-1/2">
                    <h1 className="mb-4 text-5xl sm:mb-8">Mobile App</h1>
                    <p className="text-base sm:p-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, soluta! Explicabo, placeat
                        sed. Labore perspiciatis nobis eveniet accusamus itaque repudiandae in distinctio voluptatibus,
                        similique officiis? Facilis accusantium culpa suscipit modi. Odit autem eum tenetur ducimus
                        odio. Tempore obcaecati dicta exercitationem, animi doloribus aperiam nulla quidem, recusandae
                        tempora sit rem ullam at. Quos sequi cupiditate nam eius culpa quibusdam, cum dolorum. Veritatis
                        illum omnis odio, quod voluptatum enim quia amet doloremque aliquid velit architecto modi dolore
                        doloribus provident saepe illo nihil, veniam ipsa eius! Deserunt dolorem obcaecati dignissimos,
                        recusandae vitae repellat. Culpa cum voluptatum vel dolorem temporibus blanditiis similique
                        cupiditate facere impedit neque? Aliquam necessitatibus maiores, dignissimos architecto
                        officiis, animi perspiciatis sapiente illo nulla consequatur cum. Quibusdam nulla at dignissimos
                        id! Perferendis praesentium, optio fuga commodi quia esse non quae reiciendis maiores provident.
                    </p>
                </div>
            </section>
            <AboutCanvas />
        </>
    );
}

export default About;
