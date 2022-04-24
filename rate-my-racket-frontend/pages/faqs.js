import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/FAQS.module.css'


const domain = process.env.NEXT_PUBLIC_BACKEND_API_URL

export default function FAQS() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Faqs| Rate My Racket</title>
        <meta name="description" content="Website to rate rackets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className={styles.how_to_rate_div}>

          <h1 className={styles.how_to_rate_title}>
            {"Frequently Asked Questions (FAQs)".toUpperCase()}
          </h1>


          <h2 className={styles.how_to_rate_table_title}>Table of Content</h2>

          <ul className={styles.faqs_table}>

            <li>
              <Link href="/faqs/#how-to-rate">
                <a className={styles.faqs_link}>
                  How To Rate
                </a>
              </Link>
            </li>

            <li>
              <Link href="/faqs/#how-to-rate">
                <a className={styles.faqs_link}>
                  Stars vs Points
                </a>
              </Link>
            </li>

            <li>
              <Link href="/faqs/#how-to-rate">
                <a className={styles.faqs_link}>
                  Comments, Suggestions, and Ask to include a Racket
                </a>
              </Link>
            </li>

          </ul>



          <div className={styles.how_to_rate_element_div} id="how-to-rate">

            <h2 className={styles.how_to_rate_title_section}>How To Rate</h2>

            <div className={styles.how_to_rate_element_wrapper_div}>


              <p className={styles.how_to_rate_element_div_p}>
                <strong>Rating a racket</strong> is very easy. You can use one of the following methods (note that you must be logged in as a user first):
              </p>


              <ul>
                <li>

                  <p className={styles.how_to_rate_element_div_p}>

                    <strong>Method 1 (Give starts to a racket)</strong>: You can go to one of these three pages: All Rackets, Brands,{" "}
                    or Features & Categories, and select the racket you want to rate by clicking in the <strong>"Rate" button</strong>. Then select how many starts you want to give to the racket
                    in each category. Note that you can also skip the rating of a <strong>Category/Feature</strong> if you are not sure of how many <strong>starts</strong> it deserves.

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
                    <strong>Spin</strong>. To do so, go to Features & Categories and click on the the Select Top 3 button. By using this method, the amount of <strong>points</strong>{" "}
                    increases.

                  </p>

                  <p className={styles.how_to_rate_element_div_p}>

                    Note that you can only use Method 2 once for each category, in other words, once you have selected the 3 top rackets of one category, for example, {" "}
                    <strong>Spin</strong>, you can't select another top 3 rackets for <strong>Spin</strong> again.

                  </p>
                </li>

              </ul>



            </div>

          </div>




          <div className={styles.how_to_rate_element_div} id="how-to-rate">

            <h2 className={styles.how_to_rate_title_section}>Stars vs Points</h2>

            <div className={styles.how_to_rate_element_wrapper_div}>


              <p className={styles.how_to_rate_element_div_p}>
                <strong>Stars</strong> are meant to be used to calculate the average rating of a racket. For example, if two different users evaluate the same racket
                for <strong>Spin</strong> and they gave it a rating of 8 <strong>stars</strong>, and 9 <strong>stars</strong>, then the average of this racket for{" "}
                <strong>Spin</strong> is 8.5 <strong>stars</strong>.
              </p>

              <p className={styles.how_to_rate_element_div_p}>
                In the other hand, <strong>points</strong> are meant to be a more accurate way of rating a racked based on stars, the amount of users that have rated
                the racket, and how many times has the racket been chosen as one of the top 3 for the category.
              </p>

              <p className={styles.how_to_rate_element_div_p}>
                <strong>Example (Simple):</strong> Suppose we have two rackets, one with 8.5 stars in the Spin category, and the other one with 8.3 stars in the same category.
                The first racket has only been rated by 2 users, while the other one has been rated by 300 users and has been chosen as one of the top 3 rackets for spin twice.
                In this case, even though the first rackets has more stars, the second racket seems to be better for Spin overall. Therefore, we give the second racket more
                points and we consider it better for Spin.
              </p>



            </div>

          </div>


          <div className={styles.how_to_rate_element_div} id="how-to-rate">

            <h2 className={styles.how_to_rate_title_section}>Comments, Suggestions, and Ask to include a Racket</h2>

            <div className={styles.how_to_rate_element_wrapper_div}>


              <p className={styles.how_to_rate_element_div_p}>
                Comments, Suggestions, and Critics are always welcome and appreciated. The objective of this website is to help users to find the best racket for them.
                To ask to include more parameters, discuss about rating system, make suggestion about accounts, up/down votes system, ..., or ask to include some
                racket, feel free to contact the website administrator via email at: ratemyracket@gmail.com
              </p>


            </div>

          </div>

        </div>

      </main>
    </div>
  )
}
