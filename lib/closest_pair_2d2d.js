    Vector3<Real> diff = mSegment0->Center - mSegment1->Center;
    Real a01 = -mSegment0->Direction.Dot(mSegment1->Direction);
    Real b0 = diff.Dot(mSegment0->Direction);
    Real b1 = -diff.Dot(mSegment1->Direction);
    Real c = diff.SquaredLength();
    Real det = Math<Real>::FAbs((Real)1 - a01*a01);
    Real s0, s1, sqrDist, extDet0, extDet1, tmpS0, tmpS1;

    if (det >= Math<Real>::ZERO_TOLERANCE)
    {
        // Segments are not parallel.
        s0 = a01*b1 - b0;
        s1 = a01*b0 - b1;
        extDet0 = mSegment0->Extent*det;
        extDet1 = mSegment1->Extent*det;

        if (s0 >= -extDet0)
        {
            if (s0 <= extDet0)
            {
                if (s1 >= -extDet1)
                {
                    if (s1 <= extDet1)  // region 0 (interior)
                    {
                        // Minimum at interior points of segments.
                        Real invDet = ((Real)1)/det;
                        s0 *= invDet;
                        s1 *= invDet;
                        sqrDist = s0*(s0 + a01*s1 + ((Real)2)*b0) +
                            s1*(a01*s0 + s1 + ((Real)2)*b1) + c;
                    }
                    else  // region 3 (side)
                    {
                        s1 = mSegment1->Extent;
                        tmpS0 = -(a01*s1 + b0);
                        if (tmpS0 < -mSegment0->Extent)
                        {
                            s0 = -mSegment0->Extent;
                            sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                                s1*(s1 + ((Real)2)*b1) + c;
                        }
                        else if (tmpS0 <= mSegment0->Extent)
                        {
                            s0 = tmpS0;
                            sqrDist = -s0*s0 + s1*(s1 + ((Real)2)*b1) + c;
                        }
                        else
                        {
                            s0 = mSegment0->Extent;
                            sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                                s1*(s1 + ((Real)2)*b1) + c;
                        }
                    }
                }
                else  // region 7 (side)
                {
                    s1 = -mSegment1->Extent;
                    tmpS0 = -(a01*s1 + b0);
                    if (tmpS0 < -mSegment0->Extent)
                    {
                        s0 = -mSegment0->Extent;
                        sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                            s1*(s1 + ((Real)2)*b1) + c;
                    }
                    else if (tmpS0 <= mSegment0->Extent)
                    {
                        s0 = tmpS0;
                        sqrDist = -s0*s0 + s1*(s1 + ((Real)2)*b1) + c;
                    }
                    else
                    {
                        s0 = mSegment0->Extent;
                        sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                            s1*(s1 + ((Real)2)*b1) + c;
                    }
                }
            }
            else
            {
                if (s1 >= -extDet1)
                {
                    if (s1 <= extDet1)  // region 1 (side)
                    {
                        s0 = mSegment0->Extent;
                        tmpS1 = -(a01*s0 + b1);
                        if (tmpS1 < -mSegment1->Extent)
                        {
                            s1 = -mSegment1->Extent;
                            sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                s0*(s0 + ((Real)2)*b0) + c;
                        }
                        else if (tmpS1 <= mSegment1->Extent)
                        {
                            s1 = tmpS1;
                            sqrDist = -s1*s1 + s0*(s0 + ((Real)2)*b0) + c;
                        }
                        else
                        {
                            s1 = mSegment1->Extent;
                            sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                s0*(s0 + ((Real)2)*b0) + c;
                        }
                    }
                    else  // region 2 (corner)
                    {
                        s1 = mSegment1->Extent;
                        tmpS0 = -(a01*s1 + b0);
                        if (tmpS0 < -mSegment0->Extent)
                        {
                            s0 = -mSegment0->Extent;
                            sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                                s1*(s1 + ((Real)2)*b1) + c;
                        }
                        else if (tmpS0 <= mSegment0->Extent)
                        {
                            s0 = tmpS0;
                            sqrDist = -s0*s0 + s1*(s1 + ((Real)2)*b1) + c;
                        }
                        else
                        {
                            s0 = mSegment0->Extent;
                            tmpS1 = -(a01*s0 + b1);
                            if (tmpS1 < -mSegment1->Extent)
                            {
                                s1 = -mSegment1->Extent;
                                sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                    s0*(s0 + ((Real)2)*b0) + c;
                            }
                            else if (tmpS1 <= mSegment1->Extent)
                            {
                                s1 = tmpS1;
                                sqrDist = -s1*s1 + s0*(s0 + ((Real)2)*b0) + c;
                            }
                            else
                            {
                                s1 = mSegment1->Extent;
                                sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                    s0*(s0 + ((Real)2)*b0) + c;
                            }
                        }
                    }
                }
                else  // region 8 (corner)
                {
                    s1 = -mSegment1->Extent;
                    tmpS0 = -(a01*s1 + b0);
                    if (tmpS0 < -mSegment0->Extent)
                    {
                        s0 = -mSegment0->Extent;
                        sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                            s1*(s1 + ((Real)2)*b1) + c;
                    }
                    else if (tmpS0 <= mSegment0->Extent)
                    {
                        s0 = tmpS0;
                        sqrDist = -s0*s0 + s1*(s1 + ((Real)2)*b1) + c;
                    }
                    else
                    {
                        s0 = mSegment0->Extent;
                        tmpS1 = -(a01*s0 + b1);
                        if (tmpS1 > mSegment1->Extent)
                        {
                            s1 = mSegment1->Extent;
                            sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                s0*(s0 + ((Real)2)*b0) + c;
                        }
                        else if (tmpS1 >= -mSegment1->Extent)
                        {
                            s1 = tmpS1;
                            sqrDist = -s1*s1 + s0*(s0 + ((Real)2)*b0) + c;
                        }
                        else
                        {
                            s1 = -mSegment1->Extent;
                            sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                s0*(s0 + ((Real)2)*b0) + c;
                        }
                    }
                }
            }
        }
        else 
        {
            if (s1 >= -extDet1)
            {
                if (s1 <= extDet1)  // region 5 (side)
                {
                    s0 = -mSegment0->Extent;
                    tmpS1 = -(a01*s0 + b1);
                    if (tmpS1 < -mSegment1->Extent)
                    {
                        s1 = -mSegment1->Extent;
                        sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                            s0*(s0 + ((Real)2)*b0) + c;
                    }
                    else if (tmpS1 <= mSegment1->Extent)
                    {
                        s1 = tmpS1;
                        sqrDist = -s1*s1 + s0*(s0 + ((Real)2)*b0) + c;
                    }
                    else
                    {
                        s1 = mSegment1->Extent;
                        sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                            s0*(s0 + ((Real)2)*b0) + c;
                    }
                }
                else  // region 4 (corner)
                {
                    s1 = mSegment1->Extent;
                    tmpS0 = -(a01*s1 + b0);
                    if (tmpS0 > mSegment0->Extent)
                    {
                        s0 = mSegment0->Extent;
                        sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                            s1*(s1 + ((Real)2)*b1) + c;
                    }
                    else if (tmpS0 >= -mSegment0->Extent)
                    {
                        s0 = tmpS0;
                        sqrDist = -s0*s0 + s1*(s1 + ((Real)2)*b1) + c;
                    }
                    else
                    {
                        s0 = -mSegment0->Extent;
                        tmpS1 = -(a01*s0 + b1);
                        if (tmpS1 < -mSegment1->Extent)
                        {
                            s1 = -mSegment1->Extent;
                            sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                s0*(s0 + ((Real)2)*b0) + c;
                        }
                        else if (tmpS1 <= mSegment1->Extent)
                        {
                            s1 = tmpS1;
                            sqrDist = -s1*s1 + s0*(s0 + ((Real)2)*b0) + c;
                        }
                        else
                        {
                            s1 = mSegment1->Extent;
                            sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                                s0*(s0 + ((Real)2)*b0) + c;
                        }
                    }
                }
            }
            else   // region 6 (corner)
            {
                s1 = -mSegment1->Extent;
                tmpS0 = -(a01*s1 + b0);
                if (tmpS0 > mSegment0->Extent)
                {
                    s0 = mSegment0->Extent;
                    sqrDist = s0*(s0 - ((Real)2)*tmpS0) +
                        s1*(s1 + ((Real)2)*b1) + c;
                }
                else if (tmpS0 >= -mSegment0->Extent)
                {
                    s0 = tmpS0;
                    sqrDist = -s0*s0 + s1*(s1 + ((Real)2)*b1) + c;
                }
                else
                {
                    s0 = -mSegment0->Extent;
                    tmpS1 = -(a01*s0 + b1);
                    if (tmpS1 < -mSegment1->Extent)
                    {
                        s1 = -mSegment1->Extent;
                        sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                            s0*(s0 + ((Real)2)*b0) + c;
                    }
                    else if (tmpS1 <= mSegment1->Extent)
                    {
                        s1 = tmpS1;
                        sqrDist = -s1*s1 + s0*(s0 + ((Real)2)*b0) + c;
                    }
                    else
                    {
                        s1 = mSegment1->Extent;
                        sqrDist = s1*(s1 - ((Real)2)*tmpS1) +
                            s0*(s0 + ((Real)2)*b0) + c;
                    }
                }
            }
        }
    }
    else
    {
        // The segments are parallel.  The average b0 term is designed to
        // ensure symmetry of the function.  That is, dist(seg0,seg1) and
        // dist(seg1,seg0) should produce the same number.
        Real e0pe1 = mSegment0->Extent + mSegment1->Extent;
        Real sign = (a01 > (Real)0 ? (Real)-1 : (Real)1);
        Real b0Avr = ((Real)0.5)*(b0 - sign*b1);
        Real lambda = -b0Avr;
        if (lambda < -e0pe1)
        {
            lambda = -e0pe1;
        }
        else if (lambda > e0pe1)
        {
            lambda = e0pe1;
        }

        s1 = -sign*lambda*mSegment1->Extent/e0pe1;
        s0 = lambda + sign*s1;
        sqrDist = lambda*(lambda + ((Real)2)*b0Avr) + c;
    }

    mClosestPoint0 = mSegment0->Center + s0*mSegment0->Direction;
    mClosestPoint1 = mSegment1->Center + s1*mSegment1->Direction;
    mSegment0Parameter = s0;
    mSegment1Parameter = s1;

    // Account for numerical round-off errors.
    if (sqrDist < (Real)0)
    {
        sqrDist = (Real)0;
    }
    return sqrDist;