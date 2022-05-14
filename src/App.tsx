import React from 'react';
import { Chat, KakaoBizApi } from './apis/KakaoBizApi';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
    const api = new KakaoBizApi();

    const [chats, setChats] = React.useState<Chat[]>([]);

    function getChats() {
        api.fetchChats().then((data) => setChats(data.items));
    }

    function downloadChatsXlsx() {
        const workbook = XLSX.utils.table_to_book(
            document.getElementById('xlsx')
        );
        const out = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

        const url = URL.createObjectURL(
            new Blob([out], { type: 'application/octet-stream' })
        );

        const a = document.createElement('a');
        a.href = url;
        a.download = 'chats.xlsx';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        if (a.parentNode) a.parentNode.removeChild(a);
    }

    return (
        <div>
            <button onClick={getChats}>채팅 목록 가져오기</button>
            <table id='xlsx'>
                <tr>
                    <th>chat_id</th>
                    <th>name</th>
                    <th>assignee_id</th>
                </tr>
                {chats.map((chat) => (
                    <tr>
                        <td>{chat.id}</td>
                        <td>{chat.name}</td>
                        <td>{chat.assignee_id}</td>
                    </tr>
                ))}
            </table>
            <button onClick={downloadChatsXlsx}>download</button>
        </div>
    );
}

export default App;
