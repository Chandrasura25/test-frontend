import PaymentForm from '@/components/forms/PaymentForm'
function Payment(){
	return(
		<>
			<section className='pt-16 h-screen flex justify-center items-center'>
				<div className='w-[350px] bordder bg-[#9c9c9c] p-4'><PaymentForm/></div>
			</section>
		</>
	)
}
export default Payment;