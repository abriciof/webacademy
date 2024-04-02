import { Prof, Tech } from './helpersTypes';

export function listProfs(profs: Prof[]) {
    const lista = profs.map((p)=>`<li>${p.nome}-${p.sala}</li>`);
    return `<ul>${lista.join('')}</ul>`;
}

export function listaTechs(technologias: Tech[]) {
    const technologias_filtradas = technologias.filter(tech => tech.poweredByNodejs)
    const lista = technologias_filtradas.map((t)=> `<li>${t.name} - ${t.type}</li>`);
    return `<ul>${lista.join('')}<ul>`;
  }
  