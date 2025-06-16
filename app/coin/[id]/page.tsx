export default function CoinPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Coin ID: {params.id}</h1>
    </div>
  );
}
