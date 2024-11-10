import getWedding from '../api/wedding'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Wedding } from '../models/wedding'

const useWedding = () => {
  // const [wedding, setWedding] = useState<Wedding | null>(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(false)

  // useQuery를 쓰면 데이터가 처음에 undefined로 나오고, 받아오면 그때서야 데이터가 출력됨
  // useSuspenseQuery를 쓰면 데이터가 비어있는 시간이 없음. 데이터를 받아오는 동안 fallback을 보여주고 받아오면 그때 출력. (undefined 없음)
  // app을 그리는 시점에는 이미 데이터가 불러와져있어서 wedding 데이터가 반드시 있다는 보장할 수 있음(에러가 나지 않는 이상)
  const { data, isLoading, error } = useSuspenseQuery<Wedding>({
    queryKey: ['wedding'],
    queryFn: () =>
      getWedding().then((res) => {
        if (!res.ok) {
          throw new Error('정보를 불러오지 못했습니다.')
        }
        return res.json()
      }),
  })

  // console.log('data', data) // 데이터 출력 확인

  return { wedding: data, isLoading, error }
}

export default useWedding
