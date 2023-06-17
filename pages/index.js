import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import useState from 'react'
import useForm from 'react-hook-form'

const CreateDraft = () => {
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const getData = async (d) => {
        const variantID = d.variantID;
        setData('');
        setError('');
        setLoading(true);

        const method = 'POST';

        let postBody = "vads_action_mode=INTERACTIVE&vads_amount=5000000&vads_ctx_mode=PRODUCTION&vads_currency=170&vads_cust_cell_phone=3107538520&vads_payment_cards=PSE&vads_cust_email=gcsxsjdgsnbndj%40karenkey.com&vads_cust_first_name=nbdoskjbmoidjgiod+&vads_cust_last_name=dskfoisdjgoig&vads_language=es&vads_cust_phone=&vads_page_action=PAYMENT&vads_payment_config=SINGLE&vads_site_id=23824163&vads_trans_date=20230617205901&vads_trans_id=08681b&vads_version=V2&signature=pQpcmzSfjdxGFh3m%2FXkMlxsWFXoaZUTzdUumZlJMo5M%3D&pagar=";

        const options = {
            method: method,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "cross-site",
                "Sec-Fetch-User": "?1"
            },
            body: postBody
        }

        const url = "https://secure.payzen.lat/vads-payment/"

        const res = await fetch(url, options);

        const final = await res.json();

        console.log('final data: ', final);

        if (final.error) {
            setError(final.error);
            setLoading(false);
        } else {
            setData(final.success);
            setLoading(false);
        }

        reset({})
    }

    return (
        <div>
            <div className="container text-start">
                {loading && <div className="text-center mt-5">...Loading</div>}
                {error && !loading && <h4 className="text-danger text-center mt-5">Error: {error}</h4>}
                {data && !loading && !error && <h5 className="mt-5 text-success text-center">Success</h5>}
                {data && !loading && !error && <div className="mt-1 mb-2 text-center"><span className="fw-bold">Your result:</span> {data}</div>}
                {!data && !error && !loading && <h5 className="my-4">Create draft order: </h5>}
                {data && !error && !loading && <h5 className="my-4">Create another: </h5>}
                {error && !loading && <h5 className="mb-2 mt-4">Try again: </h5>}
                {!loading && <div>
                    <form onSubmit = {handleSubmit(getData)}>
                        <label className="form-ckeck-label me-3">Enter Variant ID:</label>
                        <input className="border border-2 border-light rounded-3"
                            type="text"
                            name="variantID"
                            placeholder="i.e 1234567890"
                            {...register("variantID", {
                                required: 'Variant ID is required',
                                pattern: { value: /^[0-9]*$/, message: "Please enter numbers only." }
                            })}
                        />

                        <button className="ms-3 bg-success text-white border-0 rounded-3">Create</button>
                        {errors.variantID && <div className="formError text-danger mb-3">{errors.variantID.message}</div>}
                    </form>
                </div>}
            </div>
        </div>
    );
}

export default CreateDraft;
                
