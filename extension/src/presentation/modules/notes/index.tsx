import BaseButton from '@/presentation/components/base-button';
import Container from '@/presentation/components/container';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OPTIONS = [
  {
    label:'Lembrar de  beber Água',
    page:'/water-reminder'
  },{
    label:'Adicionar Alarme',
    page:''
  },{
    label:'Gerenciar anotações',
    page:''
  },
]

const Notes: React.FC = () => {
  const navigation = useNavigate()

  function navigateTo(page:string){  
    navigation(page)
  }

  return (
    <Container>
      <main className="flex flex-1 flex-col gap-2 mt-4 justify-start p-2">
        {OPTIONS.map((option, index) => (
          <BaseButton key={index} onClick={()=>navigateTo(option.page)} className="flex w-full items-center">{option.label}</BaseButton>
        ))}
      </main>
      <footer className="mt-4 flex items-center justify-center">
        <p className="text-sm font-semibold">v2.0-beta</p>
      </footer>
    </Container>
  );
};

export default Notes;
