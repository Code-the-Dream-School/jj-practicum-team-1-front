function PlantDetailPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img alt="Plant image" />
        <div
          style={{ display: 'flex', flexDirection: 'column', margin: '1em' }}
        >
          <span>Plant name</span>
          <span>date</span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ margin: '1em' }}>Notes</span>
        <span style={{ margin: '1em' }}>Plant API Details</span>
      </div>
    </div>
  );
}

export default PlantDetailPage;
