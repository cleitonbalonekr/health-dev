import React, { useEffect } from 'react'
import { GetInternalToken } from '@/application/use-cases/integration'
import Container from '@/presentation/components/container'
import Integration from './components/integration'
import BaseInput from '@/presentation/components/base-input'
import BaseButton from '@/presentation/components/base-button'
import { LoadPreferences, SavePreferences } from '@/application/use-cases/preferences'
interface Props {
  getInternalToken: GetInternalToken,
  savePreferences: SavePreferences
  loadPreferences: LoadPreferences
}

const Settings: React.FC<Props> = ({ getInternalToken,savePreferences,loadPreferences }) => {
  const [focusTime, setFocusTime] = React.useState<number>(25)
  const [restTime,setRestTime] = React.useState<number>(5)
  
  useEffect(() => {
    setInitialPreferences()
  }, [])

  const handleSave = async () => {
    try {
      if(validateInput()){
        await savePreferences({
          pomodoro:{
            timeToFocus: focusTime,
            timeToRest: restTime
          }
        })
        alert('Preferências salvas com sucesso')
      }
    } catch (error) {
      alert('Erro ao salvar as preferências')
    }
  }

  const handleCleanInputs = () => {
    setFocusTime(25)
    setRestTime(5)
  }

  const validateInput = () => {
    if(focusTime < 1 || focusTime > 60){
      alert('Tempo de foco inválido')
      return false
    }
    if(restTime < 1 || restTime > 60){
      alert('Tempo de descanso inválido')
      return false
    }
    return true
  }

  const setInitialPreferences = async () => {
    const preferences = await loadPreferences()
    if(preferences && preferences.pomodoro){
      setFocusTime(preferences.pomodoro.timeToFocus)
      setRestTime(preferences.pomodoro.timeToRest)
    }
  }

  return (
    <Container>
      <main className="flex flex-1 flex-col mt-3 px-2 ">
        <header className="flex flex-row  align-center">
        <BaseInput 
          placeholder="Insira o tempo de foco"
          label="Foco (minutos)"
          type="number"
          min={1}
          max={60}
          value={focusTime}
          onChange={({ target }) => setFocusTime(Number(target.value))}
        />
        <BaseInput 
          placeholder="Insira o tempo de descanso " 
          label="Descanso (minutos)" 
          type="number" 
          min={1}
          max={60}
          value={restTime}
          onChange={({ target }) => setRestTime(Number(target.value))}
        />
        </header>
        <footer className="mt-1 px-2 flex flex-row items-center justify-center">
          <button 
            className="text-white w-2/3 font-medium hover:underline"
            onClick={handleCleanInputs}
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
