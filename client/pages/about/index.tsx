import React from 'react';

import { AboutCanvas } from '../../components/aboutCanvas';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

function About() {
    return (
        <>
            <div className="fixed right-6 top-6">
                <ThemeSwitcher />
            </div>
            <div className="absolute bottom-0 right-0 h-96 w-96">
                <iframe
                    src="http://localhost:3000/iframe"
                    width="100%"
                    height="100%"
                    className="absolute bottom-0 right-0"
                />
            </div>
            <section className=" text-light-700_dark200 flex h-screen w-full flex-col justify-center  pl-80  ">
                <div className=" w-1/2">
                    <h1 className="mb-8 text-5xl">Smartwach</h1>
                    <p className="text-base">
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
                        Non impedit dignissimos asperiores doloremque sint ullam reprehenderit maiores sunt vero? Nihil
                        nobis doloremque nesciunt facere quibusdam. Accusamus? Accusamus quas maxime perspiciatis harum
                        praesentium veritatis et, fuga excepturi animi soluta magnam voluptate ipsam? Ipsum temporibus
                        vero a incidunt ad, culpa exercitationem cum harum tenetur soluta illum doloribus voluptates.
                        Ipsum fuga eius quas odit excepturi earum suscipit dolor, qui eos, vitae aliquam odio sint ex
                        aut quos error. Dignissimos, accusantium a eius corporis maiores distinctio odio commodi
                        consequuntur labore. Inventore accusantium temporibus, magni modi quam quia libero, quisquam
                        itaque laboriosam rerum, doloribus praesentium officiis ad nisi necessitatibus exercitationem
                        facilis nihil fugiat impedit saepe adipisci tempore! Perspiciatis dicta id sunt? Saepe quos
                        ducimus, natus numquam esse repudiandae perferendis iure mollitia nemo. Aperiam omnis eligendi
                        eos consequuntur quidem ratione fugiat expedita obcaecati nulla tempore, sequi quo maiores
                        voluptatum porro. Tempore, aliquid. Totam, ut? Dignissimos hic, eaque explicabo obcaecati
                        cupiditate at, quae quod quam aliquam nisi esse quidem commodi iusto tempora asperiores nihil
                        magnam corrupti, nemo quasi. Pariatur vero iure voluptas repudiandae!
                    </p>
                </div>
            </section>
            <section className="  text-light-700_dark200 flex  h-[100vh] w-full   flex-col items-end justify-center pr-80   text-white">
                <div className="w-1/2">
                    <h1 className=" mb-8 text-5xl">Mobile App</h1>
                    <p className="text-base">
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
                        Non impedit dignissimos asperiores doloremque sint ullam reprehenderit maiores sunt vero? Nihil
                        nobis doloremque nesciunt facere quibusdam. Accusamus? Accusamus quas maxime perspiciatis harum
                        praesentium veritatis et, fuga excepturi animi soluta magnam voluptate ipsam? Ipsum temporibus
                        vero a incidunt ad, culpa exercitationem cum harum tenetur soluta illum doloribus voluptates.
                        Ipsum fuga eius quas odit excepturi earum suscipit dolor, qui eos, vitae aliquam odio sint ex
                        aut quos error. Dignissimos, accusantium a eius corporis maiores distinctio odio commodi
                        consequuntur labore. Inventore accusantium temporibus, magni modi quam quia libero, quisquam
                        itaque laboriosam rerum, doloribus praesentium officiis ad nisi necessitatibus exercitationem
                        facilis nihil fugiat impedit saepe adipisci tempore! Perspiciatis dicta id sunt? Saepe quos
                        ducimus, natus numquam esse repudiandae perferendis iure mollitia nemo. Aperiam omnis eligendi
                        eos consequuntur quidem ratione fugiat expedita obcaecati nulla tempore, sequi quo maiores
                        voluptatum porro. Tempore, aliquid. Totam, ut? Dignissimos hic, eaque explicabo obcaecati
                        cupiditate at, quae quod quam aliquam nisi esse quidem commodi iusto tempora asperiores nihil
                        magnam corrupti, nemo quasi. Pariatur vero iure voluptas repudiandae!
                    </p>
                </div>
            </section>
            <AboutCanvas />
        </>
    );
}

export default About;
