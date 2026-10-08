/* Datos editables. Fuente principal: notas oficiales del parche OB55 (ff.garena.com) */
const HAS_IMG = [
  'alok', 'chronos', 'kelly', 'jota', 'hayato', 'kenta', 'morse', 'luna', 'wukong',
  'skyler', 'santino', 'nero', 'rin', 'dimitri', 'moco', 'orion', 'a124', 'alvaro',
  'andrew', 'antonio', 'caroline', 'clu', 'dasha', 'd-bee', 'ford', 'jai', 'joshep', 'k',
  'kapella', 'kla', 'laura', 'leon', 'luqueta', 'maro', 'maxim', 'miguel', 'misha',
  'notora', 'nikita', 'nairi', 'olivia', 'otho', 'oscar', 'paloma', 'shani', 'shirou',
  'steffie', 'rafael', 'tatsuya', 'thiva', 'wolfrahh', 'xayne', 'ray', 'kassie',
  'kairos', 'koda', 'ryden', 'ignis', 'suzy', 'sonia'
]; // nombres de personajes con imagen disponible (sin extensión)

// [nombre, imagen, rol (s=apoyo d=defensa m=movilidad a=ataque i=sigilo/info o=otros), habilidad, descripción, cambio en OB55]
const CHARS = [
  ['Alok','alok','s','Drop the Beat','Aura de 5 m que cura y acelera al equipo.'],
  ['Chrono','chronos','d','Time Turner','Escudo de fuerza que bloquea daño.'],
  ['Kelly','kelly','m','Dash','Corre más rápido.'],
  ['Jota','jota','a','Sustained Raids','Recupera vida al derribar con SMG o escopeta.'],
  ['Hayato','hayato','a','Bushido','Más penetración de armadura mientras menos vida tiene.'],
  ['Kenta','kenta','a','Tempest Raid','Tempestad que atraviesa muros Gloo y permite teletransportarse.','Rework completo: tempestad de 8 s con 25 de daño, teletransporte y escudo de 5 s (20 % menos daño). Enfriamiento 45 s.'],
  ['Morse','morse','i','Stealth Bytes','Sigilo de hasta 13 s; no puede disparar mientras es invisible.','Sigilo máximo 15 s → 13 s y ayuda de apuntado 4 m → 12 m.'],
  ['Luna','luna','a','Luna','Convierte cadencia de disparo en velocidad al acertar.','Bono de cadencia 8 % → 5 %.'],
  ['Wukong','wukong','i','Camouflage','Se transforma en arbusto para emboscar.','Enfriamiento 90 s → 75 s.'],
  ['Skyler','skyler','a','Riptide Rhythm','Daña muros Gloo y se cura al colocarlos.','Su efecto ahora se ve hasta más de 100 m.'],
  ['Santino','santino','o','Ver web oficial','Consulta su habilidad actual en la web oficial.','Se corrigió un error de colisión que permitía atravesar zonas.'],
  ['Nero','nero','a','Mente helada','Zona congelante que perjudica a los enemigos.','Se corrigió un error con su peluche.'],
  ['Rin','rin','a','Gale of Kunai','Lanza kunai que apuntan solos cada 8 s.'],
  ['Dimitri','dimitri','s','Healing Heartbeat','Zona que cura y deja autorrevivir a los caídos.'],
  ['Moco','moco','i','Hacker\'s Eye','Marca a los enemigos que impacta.'],
  ['Orion','orion','d','Crimson Crush','Convierte energía en protección temporal.'],
  ['A124','a124','s','Thrill of Battle','Convierte EP en vida al instante.'],
  ['Alvaro','alvaro','a','Art of Demolition','Más daño y alcance con explosivos.'],
  ['Andrew','andrew','d','Armor Specialist','Reduce el desgaste del chaleco.'],
  ['Antonio','antonio','d','Gangster\'s Spirit','Empieza con vida extra.'],
  ['Caroline','caroline','m','Agility','Se mueve más rápido con escopetas.'],
  ['Clu','clu','i','Tracing Steps','Revela enemigos cercanos.'],
  ['Dasha','dasha','a','Partying On','Menos retroceso y menos daño por caída.'],
  ['D-Bee','d-bee','m','Bullet Beats','Más movimiento y cadencia al disparar.'],
  ['Ford','ford','d','Iron Will','Reduce el daño de la zona.'],
  ['Jai','jai','a','Raging Reload','Recarga automática tras derribar.'],
  ['Joseph','joshep','m','Nutty Movement','Velocidad extra tras recibir daño.'],
  ['K','k','s','Master of All','Más EP y conversión de EP en vida.'],
  ['Kapella','kapella','s','Healing Song','Mejora las curaciones y reduce la pérdida de vida aliada.'],
  ['Kla','kla','a','Muay Thai','Más daño con los puños.'],
  ['Laura','laura','a','Sharpshooter','Más precisión con mira.'],
  ['Leon','leon','s','Buzzer Beater','Recupera vida después de cada combate.'],
  ['Luqueta','luqueta','a','Hat Trick','Sube la vida máxima con cada derribo.'],
  ['Maro','maro','a','Falcon Fervor','Más daño cuanto más lejos está el objetivo.'],
  ['Maxim','maxim','s','Gluttony','Se cura y come más rápido.'],
  ['Miguel','miguel','a','Crazy Slayer','Gana EP por cada derribo.'],
  ['Misha','misha','o','Afterburner','Vehículos más rápidos y más seguros.'],
  ['Notora','notora','o','Racer\'s Blessing','Cura a sus aliados mientras conduce.'],
  ['Nikita','nikita','a','Firearms Expert','Recarga SMG más rápido.'],
  ['Nairi','nairi','d','Ice Iron','Sus muros Gloo son más resistentes.'],
  ['Olivia','olivia','s','Healing Touch','Revive aliados con más vida.'],
  ['Otho','otho','i','Memory Mist','Revela enemigos al derribar.'],
  ['Oscar','oscar','m','Valiant Dash','Carrera que empuja a los enemigos.'],
  ['Paloma','paloma','o','Arms-dealing','La munición de fusil no ocupa espacio.'],
  ['Shani','shani','d','Gear Recycle','Restaura el chaleco tras derribos.'],
  ['Shirou','shirou','a','Damage Delivered','Primer disparo con penetración extra tras recibir daño.'],
  ['Steffie','steffie','d','Painted Refuge','Grafiti que reduce el daño.'],
  ['Rafael','rafael','i','Dead Silent','Sigilo con armas largas silenciadas.'],
  ['Tatsuya','tatsuya','m','Rebel Rush','Dash veloz en una dirección.'],
  ['Thiva','thiva','s','Vital Vibes','Rescata a los caídos más rápido.'],
  ['Wolfrahh','wolfrahh','d','Limelight','Altera el daño recibido según la zona del cuerpo.'],
  ['Xayne','xayne','a','Xtreme Encounter','Vida temporal y daño extra a Gloo y escudos.'],
  ['Ray','ray','o','El Vigilante','Consulta su habilidad actual en la web oficial.'],
  ['Kassie','kassie','o','Doctora Maniática','Consulta su habilidad actual en la web oficial.'],
  ['Kairos','kairos','o','Guardián Dual','Consulta su habilidad actual en la web oficial.'],
  ['Koda','koda','i','Rastreo','Rastrea y permite ver a través de las paredes a los enemigos que estén de pie.'],
  ['Ryden','ryden','o','Genio inventor','Consulta su habilidad actual en la web oficial.'],
  ['Ignis','ignis','o','Llama indomable','Consulta su habilidad actual en la web oficial.'],
  ['Suzy','suzy','o','Asesina de las sombras','Consulta su habilidad actual en la web oficial.'],
  ['Sonia','sonia','o','Científica nano','Consulta su habilidad actual en la web oficial.']
];
window.HAS_IMG = HAS_IMG;
window.CHARS = CHARS;

const WINFO = {
  ak: 'AK: no aparece en la lista de ajustes de armas de las notas OB55.',
  mp40: 'MP40 (OB55): alcance −15 %, velocidad de movimiento +5 % y +15 % al disparar.',
  xm8: 'XM8 (OB55): recarga +6 % y precisión −8 %.',
  awm: 'AWM (OB55): velocidad −8 % (también al disparar). Cuesta 600 monedas FF en la máquina expendedora (3 por partida) y bajó de 2200 a 2100 en Clash Squad.'
};

const OB55 = {
  naruto: { t: 'Naruto', items: [
    ['Nueve Colas', 'Antes de cada partida puede incendiar el avión (todos saltan al acabar la cuenta atrás), abrir los arsenales sin llave o dejar un cráter con botín. Los dos últimos, solo en Bermuda.'],
    ['Sharingan: Control', 'A mitad de partida aparece en el mapa. Quien lo captura elige una zona: tras 5 s de aviso cae una bomba que hace 60 de daño en 100 m y deja focos de fuego.'],
    ['Aldea de la Hoja', 'Vuelve como cabina por defecto en todos los mapas. Su Academia Ninja tiene un columpio que da +5 % de velocidad permanente.'],
    ['Reanimación', 'Al capturar un Punto de Resurrección, ataúdes de piedra devuelven a los compañeros eliminados con protección breve.'],
    ['Ninjutsu', 'Nueva Rotación de Palmas de 8 Trigramas (escudo giratorio 2 s, 50 de daño). Vuelven Bola de Fuego, Dragón de Agua, Gran Brecha, Rasengan (50), Chidori (70) y Flor de Cerezo.'],
    ['Shuriken y kunai', 'Armas secundarias: shuriken ligero (3 lanzamientos de 17–28), pesado (30–60) y kunai de fuego (50–80), de rayo y de viento. Gamakichi aparece con pergaminos de botín.']
  ]},
  br: { t: 'Batalla Real', items: [
    ['Eventos aleatorios', 'Desde el parche: Peak Mania (Bermuda), Tormenta Devastadora y Weapon Surge. Desde el 1 de octubre se suman «¿Cajas? ¡Meteoritos!» y Black Friday.'],
    ['Cajas de suministros', 'Normales desde los ~160 s (4 por partida), 2 de defensa a los 410 s con más botín y 1 Ultra que da armadura Nv. 5 y revive.'],
    ['Dispositivos', 'Ahora se dividen en activos y pasivos y puedes llevar uno de cada. Horizaline es el nuevo pasivo.'],
    ['Mecánica «Seguir»', 'Un botón te une al tren de jugadores más cercano. El líder ve una bandera que solo ve su equipo.'],
    ['Otros ajustes', 'Revivir en solitario: 540 s → 410 s. Las armas rompen el vidrio de los arsenales. El caballo gana botón de impulso y baja de 400 a 300 de vida.']
  ]},
  cs: { t: 'Clash Squad', items: [
    ['Granada de llamas', 'Fuego durante 6 s con 16 de daño cada 0,5 s. También derrite los muros Gloo.'],
    ['Granada sónar', 'Revela a los enemigos en 10 m durante 3 s.'],
    ['Humo y Naruto', 'El humo copia el efecto del Vórtice de Humo. La tienda vende ninjutsu y kunai, y la primera ronda usa shuriken en vez de pistolas.'],
    ['Super Bonfire', 'Menos curación (20 → 10 EP/s) y menos bono de cadencia (15 % → 8 %).']
  ]},
  chars: { t: 'Personajes', items: [
    ['Kenta rework', 'Tempestad de 8 s que atraviesa Gloo y hace 25 de daño; al reactivarla te teletransportas y ganas un escudo de 5 s. Enfriamiento 45 s.'],
    ['Morse', 'Menos poder cerca: ayuda de apuntado en sigilo 4 m → 12 m y duración 15 s → 13 s.'],
    ['Luna y Wukong', 'Luna baja su bono de cadencia (8 % → 5 %). Wukong se transforma más seguido: enfriamiento 90 s → 75 s.'],
    ['Correcciones', 'Santino y Nero reciben arreglos de errores y Skyler muestra sus efectos a más de 100 m.']
  ]},
  guns: { t: 'Armas (1 oct)', items: [
    ['4 armas nuevas', 'M7 (fusil con retroceso nuevo), Skorp (SMG con penetración), RPK (ametralladora ligera) y Hawk (francotirador de 2 balas).'],
    ['SMG y escopetas', 'Las SMG ganan movilidad y pierden alcance (MP40: alcance −15 %). La M1887 gana +10 % de alcance y de recarga.'],
    ['Fusiles', 'Groza: +50 % de velocidad al disparar. XM8: recarga +6 % y precisión −8 %. M4A1, SCAR, AUG y otros ganan precisión.'],
    ['Francotiradores', 'AWM, Kar98k, M24 y M82B pierden movilidad. Los marksman también reciben nerfs de velocidad.'],
    ['Ametralladoras', 'M249, M60 y Kord ganan daño y cargador, pero son más lentas y menos precisas.']
  ]},
  sys: { t: 'Sistema', items: [
    ['Duelo de Honor', 'Modo 1v1 de Lobo Solitario con emotes, banner de victoria y página para compartir.'],
    ['Pyro Pals', 'Tu Pyro aparece junto al de un amigo, puedes sacarles fotos y hay 5 colores y 10 accesorios nuevos.'],
    ['Diamantes Prime', 'Lo que gastas en un mes genera Diamantes Prime para el siguiente, al recargar cualquier monto.'],
    ['Bóveda', 'Barra de búsqueda en moda, vista previa antes de equipar y cambio de atuendo durante la búsqueda de partida.']
  ]}
};
window.OB55 = OB55;
