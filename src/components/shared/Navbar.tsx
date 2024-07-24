import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Navbar(){
	return(
		<>
			<motion.header
		      initial="hidden"
		      whileInView="show"
		      className={`fixed top-0 w-full bg-[#9D9D9D] py-2 shadow-lg`}>
				<div className='flex justify-between items-center px-8 py-3'>
					<Link to='/' className='relative flex justify-center items-center gap-2'>
						<p className='md:text-heading4-medium text-small-semibold text-white'>Test</p>
					</Link>
					<div >
						<ul className='flex gap-4 text-white'>
							<li><Link to='/'>Payment</Link></li>
							<li><Link to='/transactions'>Transactions</Link></li>
						</ul>
					</div>
				</div>
			</motion.header>
		</>
	)
}