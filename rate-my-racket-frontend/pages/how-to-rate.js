import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/HowToRate.module.css'


const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

export default function HowToRate() {

  return (
    <div className={styles.container}>
      <Head>
        <title>How To Rate | Rate My Racket</title>
        <meta name="description" content="Website to rate rackets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className={styles.how_to_rate_div}>

          <h1 className={styles.how_to_rate_title}>
            How To Rate
          </h1>

          <div className={styles.how_to_rate_element_div}>

            <p className={styles.how_to_rate_element_div_p}>
              <strong>Rating a racket</strong> is very easy. You can Rackets can rate a racket by using one of the following two methods (note that you must be logged in as a user first):
            </p>


            <ul>
              <li>

                <p className={styles.how_to_rate_element_div_p}>

                  <strong>Method 1 (Give starts to a racket)</strong>: You can go to one of these three pages: All Rackets, Brands,{" "}
                  or Features & Categories, and select the racket you want to rate by clicking in the <strong>"Rate" button</strong>. Then select how many starts you want to give to the racket
                  in each category. Note that you can also skip the rating of a <strong>Category/Feature</strong> if you are not sure of how many starts it deserves.

                </p>

                <p className={styles.how_to_rate_element_div_p}>

                  In Addition, you can also leave a <strong>comment</strong> about the racket and you experience while practicing with it so other users can learn more about the racket
                  you just rate. You comment can be <strong>up/down</strong> voted as well.

                </p>

              </li>

              <li>
                <p className={styles.how_to_rate_element_div_p}>

                  <strong>Method 2 (Select the Racket as one of the Top 3 for some feature/category): </strong> Another way of increasing the amount of points of a racket
                  is by rating it as one of the top 3 for some Feature/Category. For example, you can choose among all rackets the 3 that you think are best for{" "} 
                  <strong>Spin</strong>. To do so, go to Features & Categories and click on the the Select Top 3 button.

                </p>

                <p className={styles.how_to_rate_element_div_p}>

                  Note that you can only use Method 2 once for each category, in other words, once you have selected the 3 top rackets of one category, for example, {" "}
                  <strong>Spin</strong>, you can't select another top 3 rackets for <strong>Spin</strong> again.

                </p>
              </li>

            </ul>



          </div>

        </div>

      </main>
    </div>
  )
}
