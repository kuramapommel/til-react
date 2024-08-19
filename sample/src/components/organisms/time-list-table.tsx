import React from 'react'

type Room = {
  id: string
  name: string
  availables: boolean[]
}

type Props = {
  rooms: Room[]
}

function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i
  }
}

const TimeListTable = React.memo(function TimeListTable(props: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th className="min-w-28">ルーム</th>
          {[...range(0, 5)].map((num, index) => (
            <th key={index} className="min-w-28 text-left">
              {String(num).padStart(2, '0')}:00
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rooms.map((room, index) => (
          <tr key={index}>
            <td className="min-w-28 text-center border-2 border-white text-xl">
              {room.name}
            </td>
            {room.availables.map((available, availableIndex) => {
              return (
                <td
                  key={availableIndex}
                  className={`min-w-28 ${available ? 'bg-green-400' : 'bg-gray-400'} border-2 border-white `}
                  onClick={
                    available
                      ? () => alert('この時間は予約できます')
                      : undefined
                  }
                />
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
})

export default TimeListTable
