import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";

import AddPatientsButton from "./components/add-patients-button";

export default function PatientsPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes cadastrados no sistema.
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPatientsButton />
        </PageActions>
      </PageHeader>
    </PageContainer>
  );
}
