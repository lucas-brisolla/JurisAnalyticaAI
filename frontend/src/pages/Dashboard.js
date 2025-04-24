import React, { useState, useEffect } from 'react';
import apiService from '../services/api'; // Serviço para chamadas de API
import SummaryCard from '../components/SummaryCard'; // Componente para exibir os cards de resumo;
import TaskList from '../components/TaskList'; // Componente para exibir a lista de tarefas

function Dashboard() {
    const [summary, setSummary] = useState({ recentDocs: 0, highRisk: 0});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        //Busca dados do dashboard na API do backend
        const fetchData = async () => {
            try {
                const summaryRes = await apiService.getDashboardSummary();
                const tasksRes = await apiService.getTasks();
                setSummary(summaryRes.data);
                setTasks(tasksRes.data);
            } catch (error){
                console.error("Error fetching data", error);
                //Tratar erro na UI
                }

            };
            fetchData();
    }, []);


return (
    <div className="p-6">
        <h1 className="text-2xl font-semibold mb4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SummaryCard title="Recent Documents" value={summary.recentDocs} />
            <SummaryCard title="High Risk Alert" value={summary.highRisk} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Tarefas Agendadas</h2>
        <TaskList tasks={tasks} />
    </div>
);
}

export default Dashboard;
