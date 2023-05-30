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
  return (
    <Container>
      <main className="flex flex-1 flex-col mt-4 px-2">
        <BaseInput placeholder="Tempo de foco" type="number"></BaseInput>
        <BaseInput placeholder="Tempo de descanso" type="number" />
        <footer className="mt-3 px-2 flex flex-row items-center justify-center">
          <button className="text-white w-2/3 font-medium hover:underline">
            Limpar
          </button>
          <BaseButton className="w-1/3 px-1 py-3">Salvar</BaseButton>
        </footer>
      </main>
      <Integration getInternalToken={getInternalToken} />
    </Container>
  )
}

export default Settings
