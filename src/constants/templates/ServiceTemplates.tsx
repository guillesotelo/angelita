import PedacitoDeCielo from './services/PedacitoDeCielo'
import EncuentrosGrupales from './services/EncuentrosGrupales'
import PsicoterapiaEnGrupo from './services/PsicoterapiaEnGrupo'
import Consejeria from './services/Consejeria'
import Psicoterapia from './services/Psicoterapia'
import PsicoterapiaPrivada from './services/PsicoterapiaPrivada'
import FormacionPsicologica from './services/FormacionPsicologica'
import MenteDivina from './services/MenteDivina'

type Props = {
    service: number
    subService: number
    setSubService: (value: number) => void
    checkout: (value: number) => void
}
export default function ServiceTemplates({ service, subService, setSubService, checkout }: Props) {

    return subService ?
        subService === 1 ?
            <MenteDivina checkout={checkout} />
            : subService === 2 ?
                <PedacitoDeCielo checkout={checkout} />
                : subService === 3 ?
                    <FormacionPsicologica checkout={checkout} />
                    : subService === 4 ?
                        <Consejeria checkout={checkout} />
                        : subService === 5 ?
                            <Psicoterapia checkout={checkout} />
                            : null
        : service === 1 ?
            <EncuentrosGrupales checkout={checkout} setSubService={setSubService} />
            : service === 2 ?
                <PsicoterapiaEnGrupo checkout={checkout} setSubService={setSubService} />
                :
                service === 3 ?
                    <PsicoterapiaPrivada checkout={checkout} setSubService={setSubService} />
                    : null
}