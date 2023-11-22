
const handleDelete = async(certid) => {

    const { error } = await supabase
        .from('Certificate')
        .delete()
        .eq('CertID', certid);

    //console.log('Delete icon clicked!');
    
  };  




<Card maxW="300px" >
<CardHeader>
  <Heading size='md'>Delete Certificate</Heading>
</CardHeader>
<CardBody display="flex" alignItems="center" justifyContent="flex-end">
<Input placeholder='Enter certificate id:' />
  <DeleteIcon  boxSize={7} marginX="2" color="orange.200" onClick={() => handleDelete('yourParameter')}/>
</CardBody>

</Card>