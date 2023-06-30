import CharlaParticipativa2 from './services/CharlaParticipativa2'
import EncuentrosGrupales from './services/EncuentrosGrupales'
import PsicoterapiaEnGrupo from './services/PsicoterapiaEnGrupo'
import PsicoterapiaPrivada from './services/PsicoterapiaPrivada'
import PsicoterapiaPrivada2 from './services/PsicoterapiaPrivada2'
import PsicoterapiaPrivada3 from './services/PsicoterapiaPrivada3'
import TallerMensual from './services/TallerMensual'
import CharlaParticipativa from './services/CharlaParticipativa'

type Props = {
    service: number
    subService: number
    setSubService: (value: number) => void
    checkout: (value: number) => void
}
export default function ServiceTemplates({ service, subService, setSubService, checkout }: Props) {

    return subService ?
        subService === 1 ?
            <CharlaParticipativa checkout={checkout} />
            : subService === 2 ?
                <CharlaParticipativa2 checkout={checkout} />
                : subService === 3 ?
                    <TallerMensual checkout={checkout} />
                    : subService === 4 ?
                        <PsicoterapiaPrivada checkout={checkout} />
                        : subService === 5 ?
                            <PsicoterapiaPrivada2 checkout={checkout} />
                            : null
        : service === 1 ?
            <EncuentrosGrupales checkout={checkout} setSubService={setSubService} />
            : service === 2 ?
                <PsicoterapiaEnGrupo checkout={checkout} setSubService={setSubService} />
                :
                service === 3 ?
                    <PsicoterapiaPrivada3 checkout={checkout} setSubService={setSubService} />
                    : null
}