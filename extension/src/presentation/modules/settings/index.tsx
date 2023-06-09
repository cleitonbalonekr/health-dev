import React from 'react'
import { GetInternalToken } from '@/application/use-cases/integration'
import Container from '@/presentation/components/container'
import Integration from './components/integration'
import BaseInput from '@/presentation/components/base-input'
import BaseButton from '@/presentation/components/base-button'
interface Props {
  getInternalToken: GetInternalToken
}

const Settings: React.FC<Props> = ({ getInternalToken }) => {
  const [focusTime, setFocusTime] = React.useState<number>(0)
  const [restTime,setRestTime] = React.useState<number>(0)
  
  const handleSave = () => {
    const payload = {
      focusTime,
      restTime
    }
  }

  return (
    <Container>
      <main className="flex flex-1 flex-col mt-4 px-2">
        <BaseInput 
          placeholder="Tempo de foco" 
          type="number"
          value={focusTime}
          onChange={({ target }) => setFocusTime(Number(target.value))}
        />
        <BaseInput 
          placeholder="Tempo de descanso" 
          type="number" 
          value={restTime}
          onChange={({ target }) => setRestTime(Number(target.value))}
        />

        <footer className="mt-3 px-2 flex flex-row items-center justify-center">
          <button 
            className="text-white w-2/3 font-medium hover:underline"
          >
            Limpar
          </button>
          <BaseButton 
            className="w-1/3 px-1 py-3"
            onClick={handleSave}
          >
            Salvar
          </BaseButton>
        </footer>
      </main>
      <Integration getInternalToken={getInternalToken} />
    </Container>
  )
}

export default Settings
