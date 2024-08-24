import { range } from '@/libs/arrays'
import { Room } from '@/reducks/reservations/types'
import React from 'react'

type Props = {
  rooms: Room[]
}

const TimeListTable = React.memo(function TimeListTable(props: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th className="min-w-28">ルーム</th>
          {[...range(0, 5)].map((num) => (
            <th key={num} className="min-w-28 text-left">
              {String(num).padStart(2, '0')}:00
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rooms.map((room) => (
          <tr key={room.id}>
            <td className="min-w-28 text-center border-2 border-white text-xl">
              {room.name}
            </td>
            {room.availables.map((available, index) => {
              return (
                <td
                  key={index}
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
