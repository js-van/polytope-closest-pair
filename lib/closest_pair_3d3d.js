    // Compare edges of triangle0 to the interior of triangle1.
    Real sqrDist = Math<Real>::MAX_REAL, sqrDistTmp;
    Segment3<Real> edge;
    Real ratio;
    int i0, i1;
    for (i0 = 2, i1 = 0; i1 < 3; i0 = i1++)
    {
        edge.Center = ((Real)0.5)*(mTriangle0->V[i0] +
            mTriangle0->V[i1]);
        edge.Direction = mTriangle0->V[i1] - mTriangle0->V[i0];
        edge.Extent = ((Real)0.5)*edge.Direction.Normalize();
        edge.ComputeEndPoints();

        DistSegment3Triangle3<Real> queryST(edge, *mTriangle1);
        sqrDistTmp = queryST.GetSquared();
        if (sqrDistTmp < sqrDist)
        {
            mClosestPoint0 = queryST.GetClosestPoint0();
            mClosestPoint1 = queryST.GetClosestPoint1();
            sqrDist = sqrDistTmp;

            ratio = queryST.GetSegmentParameter()/edge.Extent;
            mTriangleBary0[i0] = ((Real)0.5)*((Real)1 - ratio);
            mTriangleBary0[i1] = (Real)1 - mTriangleBary0[i0];
            mTriangleBary0[3-i0-i1] = (Real)0;
            mTriangleBary1[0] = queryST.GetTriangleBary(0);
            mTriangleBary1[1] = queryST.GetTriangleBary(1);
            mTriangleBary1[2] = queryST.GetTriangleBary(2);

            if (sqrDist <= Math<Real>::ZERO_TOLERANCE)
            {
                return (Real)0;
            }
        }
    }

    // Compare edges of triangle1 to the interior of triangle0.
    for (i0 = 2, i1 = 0; i1 < 3; i0 = i1++)
    {
        edge.Center = ((Real)0.5)*(mTriangle1->V[i0] +
            mTriangle1->V[i1]);
        edge.Direction = mTriangle1->V[i1] - mTriangle1->V[i0];
        edge.Extent = ((Real)0.5)*edge.Direction.Normalize();
        edge.ComputeEndPoints();

        DistSegment3Triangle3<Real> queryST(edge, *mTriangle0);
        sqrDistTmp = queryST.GetSquared();
        if (sqrDistTmp < sqrDist)
        {
            mClosestPoint0 = queryST.GetClosestPoint0();
            mClosestPoint1 = queryST.GetClosestPoint1();
            sqrDist = sqrDistTmp;

            ratio = queryST.GetSegmentParameter()/edge.Extent;
            mTriangleBary1[i0] = ((Real)0.5)*((Real)1 - ratio);
            mTriangleBary1[i1] = (Real)1 - mTriangleBary1[i0];
            mTriangleBary1[3-i0-i1] = (Real)0;
            mTriangleBary0[0] = queryST.GetTriangleBary(0);
            mTriangleBary0[1] = queryST.GetTriangleBary(1);
            mTriangleBary0[2] = queryST.GetTriangleBary(2);

            if (sqrDist <= Math<Real>::ZERO_TOLERANCE)
            {
                return (Real)0;
            }
        }
    }

    return sqrDist;