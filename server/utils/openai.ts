import Controller from 'openai';
import { envs } from './envs.js';
import { Request } from 'express';
import { AirQuality } from '../../types/front';

const openai = new Controller({
    apiKey: envs.OPEN_AI,
});

export const OpenAI = () => {
    const analyze = async (_: Request, data: AirQuality) => {
        if (!data) return {};
        const { pm10, pm25, no2, o3, so2, st } = data;

        const basicInfo = [
            `Normy jakości powietrza określone pod kątem rocznej oceny jakości powietrza`,
            `Ocena jakości powietrza jest prowadzona wg kryteriów określonych w dyrektywie Parlamentu Europejskiego i Rady 2008/50/WE z dnia 21 maja 2008 roku w sprawie jakości powietrza i czystszego powietrza dla Europy oraz dyrektywie Parlamentu Europejskiego i Rady 2004/107/WE z dnia 15 grudnia 2004 r. w sprawie arsenu, kadmu, niklu, rtęci i wielopierścieniowych węglowodorów aromatycznych w otaczającym powietrzu. Obecnie pod kątem ochrony zdrowia ocenie podlega 12 substancji: dwutlenek siarki (SO2), dwutlenek azotu (NO2), tlenek węgla (CO), benzen (C6H6), ozon (O3), pył drobny PM10 (o średnicy do 10µm), pył drobny PM2,5 (o średnicy do 2,5 µm), metale ciężkie: ołów (Pb), arsen (As), nikiel (Ni), kadm (Cd) oznaczane w pyle PM10 oraz benzo(a)piren oznaczany w pyle PM10. Ze względu na ochronę roślin ocenie podlegają 3 substancje: dwutlenek siarki (SO2), tlenki azotu (NOx) i ozon (O3). Dla każdego z wymienionych zanieczyszczeń określone są stężenia w powietrzu, które nie powinny być przekraczane.`,
            `Dla dwutlenku siarki (SO2), dwutlenku azotu (NO2), tlenku węgla (CO), benzenu (C6H6), pyłu PM10, pyłu PM2,5 i ołowiu (Pb) w pyle PM10 określone są poziomy dopuszczalne.`,
            `Poziom dopuszczalny jest to poziom substancji, który ma być osiągnięty w określonym terminie i który po tym terminie nie powinien być przekraczany; poziom dopuszczalny jest standardem jakości powietrza. Poziomy dopuszczalne są określone pod kątem ochrony zdrowia ludzi i ochrony roślin`,
            `Dla ozonu (O3), pyłu drobnego PM2,5, metali ciężkich: arsen (As), nikiel (Ni), kadm (Cd)  oraz benzo(a)pirenu określony jest poziom docelowy`,
            `Poziom docelowy jest to poziom substancji, który ma być osiągnięty w określonym czasie za pomocą ekonomicznie uzasadnionych działań technicznych i technologicznych; poziom ten ustala się w celu unikania, zapobiegania lub ograniczania szkodliwego wpływu danej substancji na zdrowie ludzi lub środowisko jako całość; Poziomy docelowe są określone pod kątem ochrony zdrowia ludzi i ochrony roślin`,
            `Dla ozonu (O3) określone są poziomy celu długoterminowego.`,
            `Poziom celu długoterminowego jest to poziom substancji, poniżej którego, zgodnie ze stanem współczesnej wiedzy, bezpośredni szkodliwy wpływ na zdrowie ludzi lub środowisko jako całość jest mało prawdopodobny; poziom ten ma być osiągnięty w długim okresie czasu, z wyjątkiem sytuacji, gdy nie może być osiągnięty za pomocą ekonomicznie uzasadnionych działań technicznych i technologicznych; Poziomy celu długoterminowego do są określone pod kątem ochrony zdrowia ludzi i ochrony roślin`,
        ];

        const acceptableInfoTable = [
            `| Nazwa substancji | Okres uśredniania wyników pomiarów | Poziom dopuszczalny µg/m3 | Dopuszczalna częstość przekraczania poziomu dopuszczalnego w roku kalendarzowym | Margines tolerancji µg/m3 | Termin osiągnięcia poziomu dopuszczalnego`,
            `| Benzen (C6H6) | rok kalendarzowy | 5 | --- | --- | 2010 |`,
            `| Dwutlenek azotu (NO2) | 1 godzina | 200 | 18 razy | --- | 2010 |`,
            `| Dwutlenek azotu (NO2) | rok kalendarzowy | 40 | --- | --- | 2010 |`,
            `| Dwutlenek siarki (SO2) | 1 godzina | 350 | 24 razy | --- | 2005 |`,
            `| Dwutlenek siarki (SO2) | 24 godziny | 125 | 3 razy | --- | 2005 |`,
            `| Tlenek węgla (CO) | 8 godziny | 10 000 | --- | --- | 2005 |`,
            `| Pył PM10 | 24 godziny | 50 | 35 razy | --- | 2005 |`,
            `| Pył PM10 | rok kalendarzowy | 40 | 35 razy | --- | 2005 |`,
            `| Pył PM2,5 | rok kalendarzowy | 25 | --- | --- | 2015 |`,
            `| Pył PM2,5 | rok kalendarzowy | 20 | --- | --- | 2020 |`,
            `| Ołów (Pb) | rok kalendarzowy | 0,5 | --- | --- | 2005 |`,
        ];

        const acceptableInfo = [
            `Poziomy dopuszczalne zanieczyszczeń w powietrzu ze względu na ochronę zdrowia ludzi i ochronę roślin, terminy ich osiągnięcia oraz okresy, dla których uśrednia się wyniki pomiarów`,
            `Poziomy dopuszczalne zanieczyszczeń w powietrzu ze względu na ochronę zdrowia ludzi, terminy ich osiągnięcia oraz okresy, dla których uśrednia się wyniki pomiarów`,
            acceptableInfoTable.join('\n'),
            `Poziomy dopuszczalne dla dwutlenku siarki (SO2), tlenków azotu (NOx) w powietrzu ze względu na ochronę roślin, terminy ich osiągnięcia oraz okresy, dla których uśrednia się wyniki pomiarów`,
            `| Nazwa substancji | Okres uśredniania wyników pomiarów | Poziom dopuszczalny µg/m3 | Termin osiągnięcia poziomu dopuszczalnego |`,
            `| Tlenki azotu (NOx) | rok kalendarzowy | 30 | 2003 |`,
            `| Dwutlenek siarki (SO2) | rok kalendarzowy | 20 | 2003 |`,
            `| Dwutlenek siarki (SO2) | pora zimowa (okres od 01 X do 31 III) | 20 | 2003 |`,
        ];

        const goalsInfoTable = [
            `| Nazwa substancji | Okres uśredniania wyników pomiarów | Poziom docelowy | Dopuszczalna częstość przekraczania poziomu docelowego w roku kalendarzowym | Termin osiągnięcia poziomu docelowego`,
            `| Ozon (O3) | 8 godzin | 12 µg/m3 | 25 dni | 2010 |`,
            `| Pył PM2,5 | rok kalendarzowy | 25 µg/m3 | --- | 2010 |`,
            `| Arsen (As) | rok kalendarzowy | 6 ng/m3 | --- | 2013 |`,
            `| Nikiel (Ni) | rok kalendarzowy | 20 ng/m3 | --- | 2013 |`,
            `| Kadm (Cd) | rok kalendarzowy | 5 ng/m3 | --- | 2013 |`,
            `| Benzo(a)piren | rok kalendarzowy | 1 ng/m3 | --- | 2013 |`,
        ];

        const goalsInfo = [
            `Poziomy docelowe zanieczyszczeń w powietrzu ze względu na ochronę zdrowia ludzi i ochronę roślin, terminy ich osiągnięcia oraz okresy, dla których uśrednia się wyniki pomiarów`,
            `Poziomy docelowe dla  substancji w powietrzu, zróżnicowane ze względu na ochronę zdrowia ludzi, termin  osiągnięcia oraz okres, dla którego uśrednia się wyniki pomiarów`,
            goalsInfoTable.join('\n'),
            `Poziomy substancji w powietrzu dla zanieczyszczeń gazowych ustala się w warunkach: temperatura 293 K, ciśnienie 101,3 kPa.`,
            `Poziomy dla pyłu zawieszonego w powietrzu ustala się w warunkach rzeczywistych.`,
            `Poziom docelowy dla ozonu (O3) w powietrzu ze względu na ochronę roślin, termin jego osiągnięcia oraz okres, dla którego uśrednia się wyniki pomiarów`,
            `| Nazwa substancji | Okres uśredniania wyników pomiarów | Poziom docelowy | (µg/m3)·h | Termin osiągnięcia poziomu dopuszczalnego |`,
            `| Ozon (O3) | okres wegetacyjny (01 V - 31 VII) | 18 000 | 2010 |`,
        ];

        const longTermGoalsInfoTable = [
            `| Nazwa substancji | Okres uśredniania wyników pomiarów | Poziom celu długoterminowego | Termin osiągnięcia poziomu celu długoterminowego |`,
            `| Ozon (O3) | 8 godzin | 120 µg/m3 | 2020 |`,
            `| Ozon (O3) | okres wegetacyjny (1V / 31VII) | 6 000 (µg/m3)·h | 2020 |`,
        ];

        const longTermGoalsInfo = [
            `Poziomy celów długoterminowych dla ozonu w powietrzu, zróżnicowane ze względu na ochronę zdrowia ludzi i ochronę roślin, termin ich osiągnięcia oraz okresy, dla których uśrednia się wyniki pomiarów`,
            `Poziomy celów długoterminowych dla ozonu (O3) w powietrzu, zróżnicowane ze względu na ochronę zdrowia ludzi i ochronę roślin, termin ich osiągnięcia oraz okresy, dla których uśrednia się wyniki pomiarów`,
            longTermGoalsInfoTable.join('\n'),
            `Poziomy substancji w powietrzu dla zanieczyszczeń gazowych ustala się w warunkach: temperatura 293 K, ciśnienie 101,3 kPa.`,
        ];

        const promptLines = [
            basicInfo.join('\n'),
            acceptableInfo.join('\n'),
            goalsInfo.join('\n'),
            longTermGoalsInfo.join('\n'),
            `PM10: ${pm10.indexLevel?.id} PM2.5: ${pm25.indexLevel?.id} NO2: ${no2.indexLevel?.id} O3: ${o3.indexLevel?.id} SO2: ${so2.indexLevel?.id} ST: ${st.indexLevel?.id}`,
            `Podsumuj jakość powietrza na podstawie powyższych danych`,
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ content: promptLines.join('\n'), role: 'system' }],
        });

        const { choices } = response;
        if (!choices) return {};
        const { message } = choices[0];
        if (!message) return {};
        const { content } = message;
        if (!content) return {};
        return { analyzed: content };
    };
    return { analyze };
};
