import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface PriceProps {
  coinId: string;
}
function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["price", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Now Loading"
      ) : (
        <ApexChart
          type="area"
          series={[
            {
              name: "price area chart",
              data: [5, 6, 17, 2, 6, 8, 0, 1, 5],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            dataLabels: {
              enabled: false,
            },
            title: {
              text: `${coinId} price`,
              align: "center",
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
